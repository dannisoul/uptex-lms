import { IconFile, IconFileText, IconFileTypeDocx, IconFileTypePdf, IconFileTypePpt, IconFileTypeXls, IconMusic, IconMovie, IconPhoto } from '@tabler/icons-react'

export function getIcon (mimeType) {
  if (mimeType.startsWith('image/')) return <IconPhoto />
  if (mimeType.startsWith('video/')) return <IconMovie />
  if (mimeType.startsWith('audio/')) return <IconMusic />
  if (mimeType === 'application/pdf') return <IconFileTypePdf />
  if (mimeType === 'text/plain') return <IconFileText />
  if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return <IconFileTypeDocx />
  if (mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return <IconFileTypeXls />
  if (mimeType === 'application/vnd.ms-powerpoint' || mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') return <IconFileTypePpt />
  return <IconFile />
}
