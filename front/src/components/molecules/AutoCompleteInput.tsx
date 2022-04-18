import React, { useState } from 'react'

import { Divider, Input, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'

export type AutoCompletableItem<I> = {
  id: I
  label: string
  completableStr: string
}

export type AutoCompleteInputProps<
  T extends AutoCompletableItem<number> | AutoCompletableItem<string>,
> = {
  items: T[]
  onSelect?: (item: T) => void
}

export default function AutoCompleteInput<
  T extends AutoCompletableItem<number> | AutoCompletableItem<string>,
>({ items, onSelect }: AutoCompleteInputProps<T>): JSX.Element {
  const [value, setValue] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  const candidates = value === '' ? [] : items.filter((c) => c.completableStr.includes(value))

  const [isConfirmed, setIsConfirmed] = useState(false)

  const isOpen = value !== '' && !isConfirmed

  const select = (item: T) => {
    if (onSelect) {
      onSelect(item)
    }
    setIsConfirmed(true)
    setValue(item.label)
  }

  return (
    <>
      <Popover isOpen={isOpen} gutter={4} matchWidth autoFocus={false}>
        <PopoverTrigger>
          <Input value={value} onChange={handleChange} onClick={() => setIsConfirmed(false)} />
        </PopoverTrigger>
        <PopoverContent maxWidth="400px" width="inherit">
          <div>
            {candidates.map((item, idx) => {
              return (
                <div key={idx}>
                  {idx != 0 ? <Divider /> : <></>}
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => select(item)}
                  >
                    {item.label}
                  </div>
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
