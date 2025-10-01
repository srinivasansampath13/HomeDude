export const emailValidation = (emailValue: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailValue)){
      return false;
    }else{
      return true;
    }
}