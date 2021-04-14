import { PageProps } from "gatsby"
import React from "react"
import * as styles from "../styles/main.module.scss"
import "normalize.css"

const Home = (props: PageProps) => (
  <div>
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className="impact">
          Elvin Luff <span style={{ color: "white"}}>is a</span><br />Cloud Systems Engineer <span style={{ color: "white"}}>in</span> Amsterdam.
        </h1>
      </div>
    </div>
  </div>
)

export default Home
