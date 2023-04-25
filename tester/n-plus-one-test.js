import http from "k6/http";

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1000,
      timeUnit: "1s", // 1000 iterations per second, i.e. 1000 RPS
      duration: "30s",
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  http.get("http://localhost:3000/n-plus-one");
}
