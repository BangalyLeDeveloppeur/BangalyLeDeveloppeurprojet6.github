const addWork = () => {
  const token = localStorage.getItem('authToken')
  const formData = new FormData()
  formData.append('image', inputFile.files[0])
  formData.append('title', '')
  formData.append('category', '')
  const response = fetch('url', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
}

////////////////////
