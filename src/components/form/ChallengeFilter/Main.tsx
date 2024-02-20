"use client"

import { Fragment, useState } from "react"
import { FieldValues } from "react-hook-form"
import styled from "styled-components"
import { ObjectEntries } from "@/libs/utils"
import PageFilter from "@/components/display/PageFilter"
import Badge from "@/components/display/Badge"
import Icon from "@/components/general/Icon"
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc"
import { ChallengeFilterTypes } from "@/components/form/ChallengeFilter"
import Input from "@/components/entry/Input"
import Select, { SelectMainProps } from "@/components/entry/Select"

type ArrayValuedKeys<T> = {
  [K in keyof T as T[K] extends unknown[] ? K : never]: T[K]
}

type Badge = {
  [key in keyof ArrayValuedKeys<ChallengeFilterTypes>]: SelectMainProps<ChallengeFilterTypes>["optionGroups"][number]["options"]
}

export interface ChallengeFilterMainProps<T extends FieldValues = ChallengeFilterTypes> extends FormHocMainProps<T> {
  //
}

const ChallengeFilterMain = FormHoc<ChallengeFilterTypes>((props: ChallengeFilterMainProps) => {
  const { formTitle, formAction, formData, formPlaceholder, formOptionGroups, handleValid, ...restProps } = props

  const { control, handleSubmit, getValues, setValue } = formData

  const getBadge = (key: keyof Badge) => {
    return (formOptionGroups?.[key] ?? [])
      ?.flatMap(({ options }) => options)
      ?.filter(({ value }) => getValues(key).find((key) => key === value))
  }

  const [badge, setBadge] = useState<Badge>(() => ({
    state: getBadge("state"),
    type: getBadge("type"),
    level: getBadge("level"),
    pedigree: getBadge("pedigree"),
  }))

  const appendBadge = (key: keyof Badge) => {
    setBadge((prev) => ({
      ...prev,
      [key]: getBadge(key),
    }))
    handleSubmit(handleValid)()
  }

  const removeBadge = (key: keyof Badge, option: Badge[keyof Badge][number]) => {
    const newValue = getValues(key).filter((key) => key !== option.value)
    setValue(key, newValue as string[] | number[])
    handleSubmit(handleValid)()
  }

  const resetBadge = () => {
    setValue("state", [])
    setValue("type", [])
    setValue("level", [])
    setValue("pedigree", [])
    handleSubmit(handleValid)()
  }

  return (
    <ChallengeFilterMainContainer id="challenge-filter" onSubmit={handleSubmit(handleValid)} noValidate {...restProps}>
      <PageFilter>
        <PageFilter.Search>
          <Select<ChallengeFilterTypes>
            control={control}
            name="state"
            rules={{}}
            title="상태 선택"
            multiple={true}
            shape="square"
            placeholder={formPlaceholder?.state ?? ""}
            optionGroups={formOptionGroups?.state ?? []}
            className="col-select"
            onChange={() => appendBadge("state")}
          />
          <Select<ChallengeFilterTypes>
            control={control}
            name="type"
            rules={{}}
            title="유형 선택"
            multiple={true}
            shape="square"
            placeholder={formPlaceholder?.type ?? ""}
            optionGroups={formOptionGroups?.type ?? []}
            className="col-select"
            onChange={() => appendBadge("type")}
          />
          <Select<ChallengeFilterTypes>
            control={control}
            name="level"
            rules={{}}
            title="난이도 선택"
            multiple={true}
            shape="square"
            placeholder="난이도"
            optionGroups={formOptionGroups?.level ?? []}
            className="col-select"
            onChange={() => appendBadge("level")}
          />
          <Select<ChallengeFilterTypes>
            control={control}
            name="pedigree"
            rules={{}}
            title="기출 선택"
            multiple={true}
            shape="square"
            placeholder="기출"
            optionGroups={formOptionGroups?.pedigree ?? []}
            className="col-select"
            onChange={() => appendBadge("pedigree")}
          />
          <Input<ChallengeFilterTypes>
            control={control}
            name="keyword"
            rules={{}}
            type="text"
            placeholder={formPlaceholder?.keyword ?? ""}
            appendIcon={
              <button type="submit">
                <Icon name="MagnifyingGlass" aria-hidden={true} />
                <span className="sr-only">{formAction?.submit ?? "검색"}</span>
              </button>
            }
            className="col-input"
          />
        </PageFilter.Search>
        <PageFilter.Badge onReset={resetBadge}>
          {(Object.entries(badge) as ObjectEntries<Badge>).map(([key, options]) =>
            !options.length ? null : (
              <Fragment key={key}>
                {options.map((option) => (
                  <Badge key={`${key}-${option.value}`} onRemove={() => removeBadge(key, option)}>
                    {option.text}
                  </Badge>
                ))}
              </Fragment>
            ),
          )}
        </PageFilter.Badge>
        <PageFilter.Title>{formTitle ?? "전체 문제"}</PageFilter.Title>
        <PageFilter.Action>
          <Select<ChallengeFilterTypes>
            control={control}
            name="sort"
            rules={{}}
            title="정렬 선택"
            multiple={false}
            shape="plain"
            placeholder="정렬"
            optionGroups={formOptionGroups?.sort ?? []}
          />
        </PageFilter.Action>
      </PageFilter>
    </ChallengeFilterMainContainer>
  )
})

const ChallengeFilterMainContainer = styled.form`
  .col-select {
    width: auto;
  }
  .col-input {
    width: 240px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    .col-select {
      width: calc(50% - 4px);
    }
    .col-input {
      width: 100%;
    }
  }
`

export default ChallengeFilterMain
