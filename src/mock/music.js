import Mock from 'mockjs'

const url = {
  testUrl: '/api/musics',
}

export default Mock.mock(url.testUrl, 'get', (opt) => {
  console.log('opt', opt)

  return {
    musics: [
      {
        name: 'name',
        album: 'album',
        singer: 'singer',
        id: 1,
      },
      {
        name: 'name',
        album: 'album',
        singer: 'singer',
        id: 2,
      },
    ],
  }
})
