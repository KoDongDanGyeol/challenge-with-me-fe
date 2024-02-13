import { useCallback, useEffect, useRef } from "react"
import { NonUndefined, Nullable } from "@/libs/utils"
import { Timer, clearTimer, setTimer } from "@/libs/timer"

const focusableSelector = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "video[controls]",
  "audio[controls]",
  "[contenteditable='']",
  "[contenteditable='true']",
  "[tabindex]",
]

type IsInit = boolean
type Listeners = [string, (evnet: KeyboardEvent) => void][]

const useFocusTrap = (isInit: IsInit, listeners?: Listeners) => {
  const timers = useRef<Timer>({ delay: null })
  const isInitialized = useRef<boolean>(isInit)

  const containerRef = useRef<NonUndefined<Nullable<HTMLDivElement>>>(null)
  const focusableRef = useRef<NonUndefined<Nullable<HTMLElement[]>>>(null)
  const activeRef = useRef<NonUndefined<Nullable<HTMLElement>>>(null)
  const returnRef = useRef<NonUndefined<Nullable<HTMLButtonElement>>>(null)

  const keydownTab = (event: KeyboardEvent) => {
    if (!focusableRef.current?.length) return
    const { length, 0: first, [length - 1]: last } = focusableRef.current
    if (event.target === first && event.shiftKey) {
      event.preventDefault()
      last.focus()
    }
    if (event.target === last && !event.shiftKey) {
      event.preventDefault()
      first.focus()
    }
  }

  const keydownListener = useCallback(
    (event: KeyboardEvent) => {
      const keys = [["Tab", keydownTab], ...(listeners ?? [])] as Listeners
      const listener = new Map(keys).get(event.key)
      return listener && listener(event)
    },
    [listeners],
  )

  const onActivate = useCallback(() => {
    isInitialized.current = true
    activeRef.current = document.activeElement as HTMLElement
    focusableRef.current = (
      Array.from(containerRef.current?.querySelectorAll(focusableSelector.join(", ")) ?? []) as HTMLElement[]
    ).filter((el) => Number(el.getAttribute("tabindex")) >= 0)
    containerRef.current?.addEventListener("keydown", keydownListener)
    focusableRef.current?.[0]?.focus()
  }, [])

  const onDeactivate = useCallback(async () => {
    containerRef.current?.removeEventListener("keydown", keydownListener)
    if (isInitialized.current) {
      clearTimer(timers, { key: "delay" })
      await setTimer(timers, { key: "delay", delay: 0 })
      if (returnRef.current) returnRef.current?.focus()
      else activeRef.current?.focus()
    }
    isInitialized.current = false
    activeRef.current = null
    focusableRef.current = []
  }, [])

  useEffect(() => {
    isInitialized.current && onActivate()
    return () => {
      onDeactivate()
    }
  }, [])

  return {
    focusTrapRefs: {
      containerRef,
      returnRef,
    },
    onActivate,
    onDeactivate,
  }
}

export default useFocusTrap
