import { Breadcrumb } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './breadcrumb.module.scss'

const CustomBreadcrumb = () => {
  const location = useLocation()
  console.log(location, 'location');


  return (
    <Breadcrumb className={styles.breadcrumb}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Application Center</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Application List</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default CustomBreadcrumb