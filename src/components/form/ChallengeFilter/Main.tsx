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
  }

  const removeBadge = (key: keyof Badge, option: Badge[keyof Badge][number]) => {
    const newValue = getValues(key).filter((key) => key !== option.value)
    setValue(key, newValue)
  }

  const resetBadge = () => {
    setValue("state", [])
    setValue("type", [])
    setValue("level", [])
    setValue("pedigree", [])
  }

  return (
    <ChallengeFilterMainContainer
      id="challenge-filter"
      asTag="form"
      onSubmit={handleSubmit(handleValid)}
      noValidate
      {...restProps}
    >
      <PageFilter.Search>
        <Select<ChallengeFilterTypes>
          control={control}
          name="state"
          rules={{}}
          multiple={true}
          shape="square"
          title={`${formPlaceholder?.state} 선택`}
          placeholder={formPlaceholder?.state ?? ""}
          optionGroups={formOptionGroups?.state ?? []}
          className="col-select"
          onChange={() => {
            appendBadge("state")
            handleSubmit(handleValid)()
          }}
        />
        <Select<ChallengeFilterTypes>
          control={control}
          name="type"
          rules={{}}
          multiple={true}
          shape="square"
          title={`${formPlaceholder?.type} 선택`}
          placeholder={formPlaceholder?.type ?? ""}
          optionGroups={formOptionGroups?.type ?? []}
          className="col-select"
          onChange={() => {
            appendBadge("type")
            handleSubmit(handleValid)()
          }}
        />
        <Select<ChallengeFilterTypes>
          control={control}
          name="level"
          rules={{}}
          multiple={true}
          shape="square"
          title={`${formPlaceholder?.level} 선택`}
          placeholder={formPlaceholder?.level ?? ""}
          optionGroups={formOptionGroups?.level ?? []}
          className="col-select"
          onChange={() => {
            appendBadge("level")
            handleSubmit(handleValid)()
          }}
        />
        <Select<ChallengeFilterTypes>
          control={control}
          name="pedigree"
          rules={{}}
          multiple={true}
          shape="square"
          title={`${formPlaceholder?.pedigree} 선택`}
          placeholder={formPlaceholder?.pedigree ?? ""}
          optionGroups={formOptionGroups?.pedigree ?? []}
          className="col-select"
          onChange={() => {
            appendBadge("pedigree")
            handleSubmit(handleValid)()
          }}
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
      <PageFilter.Badge
        onReset={() => {
          resetBadge()
          handleSubmit(handleValid)()
        }}
      >
        {(Object.entries(badge) as ObjectEntries<Badge>).map(([key, options]) =>
          !options.length ? null : (
            <Fragment key={key}>
              {options.map((option) => (
                <Badge
                  key={`${key}-${option.value}`}
                  onRemove={() => {
                    removeBadge(key, option)
                    handleSubmit(handleValid)()
                  }}
                >
                  {option.text}
                </Badge>
              ))}
            </Fragment>
          ),
        )}
      </PageFilter.Badge>
      <PageFilter.Title>{formTitle}</PageFilter.Title>
      <PageFilter.Action>
        <Select<ChallengeFilterTypes>
          control={control}
          name="sort"
          rules={{}}
          multiple={false}
          shape="plain"
          title={`${formPlaceholder?.sort} 선택`}
          placeholder={formPlaceholder?.sort ?? ""}
          optionGroups={formOptionGroups?.sort ?? []}
          onChange={() => {
            handleSubmit(handleValid)()
          }}
        />
      </PageFilter.Action>
    </ChallengeFilterMainContainer>
  )
})

const ChallengeFilterMainContainer = styled(PageFilter)`
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
