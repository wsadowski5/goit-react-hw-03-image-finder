import { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css'

export class Loader extends Component {

    render () {
        return <div className={css.loader}><BallTriangle
        height={200}
        width={200}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
      </div>
    }
}