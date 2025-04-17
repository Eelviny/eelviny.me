import { PageProps } from "gatsby"
import React from "react"
import * as styles from "../styles/main.module.scss"
import "normalize.css"

const Home = (props: PageProps) => (
  <div>
    <div className={styles.hero}>
      <div className={styles.main}>
        <h1 className="impact">
          Elvin Luff <span style={{ color: "white"}}>is a</span><br />Cloud Systems Engineer <span style={{ color: "white"}}>in</span> Amsterdam.
        </h1>
      </div>
    </div>
    <div className={styles.homeBody}>
      <div>
        <p>Testing 123!</p>
      </div>
      <div>
        <p>another test</p>
      </div>
    </div>
  </div>
)

export default Home
