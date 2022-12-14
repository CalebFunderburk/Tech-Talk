async function editFormHandler(event) {
  event.preventDefault()

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const title = document.querySelector('input[name="post-title"]').value.trim()
  const body = document.getElementById('post-edit').value.trim()

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
      body: body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText)
  }


}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler)