import { UserInfo } from '../types/UserInfo'
import getUserInfo from '../services/getUserInfo'
import React from 'react'

export default function Id (props: any) {
  return (
  <div>
   <h1>Ща пущу...</h1>
  </div>
  )
}

export async function getServerSideProps (req: any) {
  const userInfo: UserInfo = getUserInfo(req.req)
  const HOST_URL = process.env.host_url || req.req.headers.host

  const response = await fetch(
    'http://' +
  HOST_URL +
  '/api/hash/' +
  req.params.id +
  '/?os=' +
  userInfo.os +
  '&browser=' +
  userInfo.browser
  )
  if (response.ok) {
    const json = await response.json()

    return {
      redirect: {
        destination: 'https://' + decodeURIComponent(json.result),
        permanent: true
      }
    }
  } else {
    return { notFound: true }
  }
}
