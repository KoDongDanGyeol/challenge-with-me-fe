"use client"

import { useCallback } from "react"
import { RecoilRoot, SetRecoilState } from "recoil"
import { Flag, atomFlag } from "@/stores/flag"

interface RecoilProviderProps extends React.PropsWithChildren {
  flag?: Flag
}

const RecoilProvider = (props: RecoilProviderProps) => {
  const { flag, children } = props

  const initializeState = useCallback(
    ({ set }: { set: SetRecoilState }) => {
      if (flag) set(atomFlag, flag)
    },
    [flag],
  )

  return <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
}

export default RecoilProvider
