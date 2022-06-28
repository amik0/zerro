import { sendEvent } from 'shared/helpers/tracking'
import { AppThunk } from 'models'
import { applyClientPatch } from 'models/data'
import { getRootUser } from 'models/user'
import { getTag } from 'models/tag'
import { OptionalExceptFor } from 'shared/types'
import { TTag, TZmTag } from './types'
import { makeTag } from './makeTag'

type TagDraft = OptionalExceptFor<TTag, 'id'>

export const patchTag =
  (tag: TagDraft): AppThunk =>
  (dispatch, getState): TZmTag => {
    if (!tag.id) throw new Error('Trying to patch tag without id')
    if (tag.id === 'null') throw new Error('Trying to patch null tag')
    let current = getTag(getState(), tag.id)
    if (!current) throw new Error('Tag not found')
    const patched = { ...current, ...tag, changed: Date.now() }

    sendEvent('Tag: edit')
    dispatch(applyClientPatch({ tag: [patched] }))
    return patched
  }

export const createTag =
  (tag: OptionalExceptFor<TTag, 'title'>): AppThunk =>
  (dispatch, getState) => {
    if (hasId(tag)) return dispatch(patchTag(tag))
    if (!tag.title) throw new Error('Trying to create tag without title')
    const state = getState()
    let user = getRootUser(state)?.id
    if (!user) throw new Error('No user')
    const newTag = makeTag({ ...tag, user })

    sendEvent('Tag: create')
    dispatch(applyClientPatch({ tag: [newTag] }))
    return newTag
  }

const hasId = (tag: Partial<TTag>): tag is TagDraft => !!tag.id
