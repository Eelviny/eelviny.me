import { PageProps } from "gatsby"
import React from "react"
import * as styles from "../styles/main.module.scss"
import "normalize.css"

export default function Home(props: PageProps) {
  return <div className={styles.homeBackground}>
    <div className={styles.main}>Elvin Luff is a Cloud Systems Engineer in Amsterdam.</div>
  </div>
}
