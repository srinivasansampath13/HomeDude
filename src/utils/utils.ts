export const isEmailValidation = (emailValue: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailValue)){
      return false;
    }else{
      return true;
    }
}