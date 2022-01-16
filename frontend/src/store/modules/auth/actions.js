let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", { data: { ...payload }, mode: "login" });
  },
  async signup(context, payload) {
    return context.dispatch("auth", { data: { ...payload }, mode: "signup" });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const url = process.env.VUE_APP_API_URL + "/" + mode;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate."
      );
      throw error;
    }

    if (responseData.token) {
      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(() => {
        context.dispatch("autoLogout");
      }, expiresIn);

      context.commit("setUser", {
        token: responseData.token,
        userId: responseData.userId,
      });
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
