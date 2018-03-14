const put = document.getElementById('update')
const del = document.getElementById('delete')

const update = () => {
  fetch('users', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Antonio',
      email: 'antonio@devsha.com'
    })
  })
    .then(res => { if (res.ok) return res.json() })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  console.log('ok')
}

const delet = () => {
  fetch('users', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Antonio'
    })
  })
    .then(res => { if (res.ok) return res.json() })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
}

put.addEventListener('click', update)
del.addEventListener('click', delet)
