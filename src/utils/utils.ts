export const isEmailValidation = (emailValue: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailValue)){
      return false;
    }else{
      return true;
    }
}

// Allow only characters supported by Auth0 username policy
export const sanitizeUsername = (name: string) => {
  return name
    .trim()
    .replace(/\s+/g, '_') // spaces -> underscores
    .replace(/[^A-Za-z0-9_+\-\.!#$'\^`~@]/g, '') // remove disallowed chars
    .slice(0, 30); // optional length cap
}