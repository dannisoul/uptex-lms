export function FilePreview ({ file, handleModal }) {
  return (
    <div className='fixed z-20 inset-0 m-auto bg-black/75 w-full h-full flex justify-center items-center'>
      {file.mimeType.startsWith('image/') && <img src={file.path} className='h-[90dvh] object-contain' />}
      {file.mimeType.startsWith('video/') && <video src={file.path} controls autoPlay className='w-3/4' />}
      {file.mimeType.startsWith('application/pdf') && <iframe src={file.path} className='w-3/4' width='90%' height='90%' />}
      {
          (file.mimeType === 'application/msword' || file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimeType === 'application/vnd.ms-powerpoint' || file.mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
            file.mimeType === 'application/vnd.ms-excel' || file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
              <iframe
                className='w-3/4' width='90%' height='90%'
                src={`https://view.officeapps.live.com/op/view.aspx?src=${file.path}`}
              />
        }
      {file.mimeType.startsWith('text/plain') &&
        <iframe
          className='w-3/4' width='90%' height='90%' src={`https://docs.google.com/gview?url=${file.path}&embedded=true`}
        />}
      <button className='absolute top-2 right-2 lg:text-sm text-xs bg-primary-accent text-white py-1 px-2 rounded-full font-medium' onClick={handleModal}>Cerrar</button>
    </div>
  )
}
