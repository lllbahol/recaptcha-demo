import React from 'react';
import PropTypes from 'prop-types';

import { RECAPTCHA_SITE_KEY, RECAPTCHA_API } from '../../constants';

export class ReCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onloadCallback = this.onloadCallback.bind(this);
    this.expired = this.expired.bind(this);
  }
  componentDidMount() {
    const script = document.createElement('script');
    script.src = `${RECAPTCHA_API}`;
    script.charset = 'utf-8';
    script.async = true;
    script.defer = true;
    /**
     * 资源加载完毕时，grecaptcha.render不一定生成了
     * 因此在资源加载完毕500ms之后再调用callback
     */ 
    script.onload = () => { this.timeout = setTimeout(this.onloadCallback, 500); };
    document.body.appendChild(script);
  }
  /**
   * 前端人机验证通过后调用
   */
  verifyCallback(response) {
    console.log('frontend verify success, get token...', response);
    // 进行后端验证请求
    // axios.post('your_api_path', {
    //   response,
    // }).then((res) => {
    //   if (this.props.setSuccess) {
    //     const callback = res.data.success;
    //     this.props.setSuccess(callback); 
    //   }
    // }).catch((e) => {
    //   // console.log(e);
    // });
    if (this.props.setSuccess) {
      const callback = true;
      this.props.setSuccess(callback); 
    }
  }
  /**
   * 当script加载完毕后调用
   */
  onloadCallback() {
    console.log('loaded...');
    const captchaRef = this.recaptcha;
    grecaptcha.render(captchaRef, {
      sitekey: RECAPTCHA_SITE_KEY,
      callback: this.verifyCallback,
      'expired-callback': this.expired,
      theme: 'light',
    });
  };
  /**
   * 通过验证一分钟后，验证过期
   */
  expired() {
    console.log('expired...');    
    if (this.props.setSuccess) {
      this.props.setSuccess(false);
    }
  }
  componentWillUnMount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <div ref={(node) => { this.recaptcha = node; }} ></div>
    );
  }
}
ReCaptcha.propTypes = {
  setSuccess: PropTypes.func,
}

export default ReCaptcha;
