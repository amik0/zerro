import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Popover,
  SxProps,
  TextField,
} from '@mui/material'
import './styles.scss'
import { zmColors, colors } from './colors'
import { isHEX } from '@shared/helpers/color'
import Rhythm from '@shared/ui/Rhythm'
import { TPopoverProps } from '@shared/ui/PopoverManager'

export const colorPickerKey = 'colorPicker'

export type ColorPickerProps = TPopoverProps & {
  value?: string | null
  onColorChange: (value: string | null) => void
}

export const ColorPicker: FC<ColorPickerProps> = ({
  value,
  onColorChange,
  onClose = () => {},
  ...rest
}) => {
  const [custom, setCustom] = useState(value || '')
  const handleColorClick = (color?: string | null) => {
    if (isSameColor(value, color) || color === null) {
      onColorChange(null)
      onClose()
      return
    }
    if (!isHEX(color)) return
    setCustom(color)
    onColorChange(color)
    onClose()
  }
  useEffect(() => {
    setCustom(value || '')
  }, [value])

  return (
    <Popover onClose={onClose} {...rest}>
      <Rhythm gap={2} p={2}>
        <Box sx={gridSx}>
          {zmColors.map(color => (
            <ColorCheck
              key={color}
              hex={color}
              checked={color?.toUpperCase() === value?.toUpperCase()}
              onChange={() => handleColorClick(color)}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={gridSx}>
          {colors.map(color => (
            <ColorCheck
              key={color}
              hex={color}
              checked={color?.toUpperCase() === value?.toUpperCase()}
              onChange={() => handleColorClick(color)}
            />
          ))}
        </Box>
        <TextField
          variant="outlined"
          fullWidth
          value={custom}
          onChange={e => setCustom(e.target.value)}
          placeholder="#000000"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ColorCheck
                  hex={isHEX(custom) ? custom : value}
                  checked={isSameColor(value, custom)}
                  onChange={() => handleColorClick(custom)}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button fullWidth onClick={() => handleColorClick(null)}>
          Убрать цвет
        </Button>
      </Rhythm>
    </Popover>
  )
}

function isSameColor(a?: string | null, b?: string | null) {
  if (!a && !b) return true
  if (a && b) return a.toLowerCase() === b.toLowerCase()
  return false
}

const gridSx: SxProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
}

type ColorCheckProps = {
  hex?: string | null
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const ColorCheck: FC<ColorCheckProps> = ({ hex, checked, onChange }) => {
  if (!hex) return null
  return (
    <label className={`color-check-label`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div
        className={`marker ${checked && 'checked'}`}
        style={{ backgroundColor: hex }}
      />
    </label>
  )
}