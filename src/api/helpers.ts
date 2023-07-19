export const notAuthLogout = () => {
 console.log("НЕ АВТОРИЗОВАН");
 localStorage.removeItem(`auth-token`);
 localStorage.removeItem(`active-my-forms`);
 localStorage.removeItem(`active-forms-id`);
 window.location.reload();
};
