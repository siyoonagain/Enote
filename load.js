export function loadToken(go) {
  var refreshUrl = "http://35.212.150.195/api/user/refresh_token";
  var verifyUrl = "http://35.212.150.195/api/user/verify_token";

  if (!sessionStorage.getItem("access_token")) {
    //refresh_token api
    fetch(refreshUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: sessionStorage.getItem("refresh_token"),
      }),
    })
      .then((reas) => {
        if (res.status === 422 || res.status === 500) {
          throw new Error("오류가 발생했습니다. 관리자에게 문의해주세요.");
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("user_id", data.id);
        sessionStorage.setItem("refresh_token", data.refresh_token);
        //verify token api
        fetch(verifyUrl, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: sessionStorage.getItem("access_token"),
          }),
        })
          .then((res) => {
            if (res.status === 400) {
              throw new Error("재로그인이 필요합니다.");
            } else if (res.status === 422 || res.status === 500) {
              throw new Error("오류가 발생했습니다. 관리자에게 문의해주세요.");
            } else {
              return res.json();
            }
          })
          .then((data) => {})
          .catch((error) => alert(error));
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    go;
  }
}
