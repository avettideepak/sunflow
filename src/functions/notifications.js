import { Workbox } from "workbox-window"

const applicationServerPublicKey =
  "BFj6RV4VTD48YzLojREDvYzeevzyA_VPg-x3FbU1SB3Tq6grk6eRLBLZ6nwbGX7EWTDK237_8KnhjA45qf5x66k"
const notificationUrl =
  "https://demob2b2cpreview.avetti.io/preview/notification.ajx?vid=" +
  process.env.GATSBY_VID

// object for Chrome/Firefox/Opera subscription
let param = {}
// object for Safari subscription
let subscriptionObject = {
  topic: "test topic",
  attribute: "test attr",
  subscription: {
    endpoint: "",
    expirationTime: "null",
    keys: {
      p256dh: "1",
      auth: "1",
    },
  },
  deviceInfo: {},
}
const chromeNotifications = () => {
  console.log("chromeNotifications")
  if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
    console.warn("Notifications aren't supported.")
    return
  }

  if (Notification.permission === "denied") {
    console.warn("The user has blocked notifications.")
    return
  }

  if (!("PushManager" in window)) {
    console.warn("Push messaging isn't supported.")
    return
  }
  if (typeof window !== undefined) {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then(function (subscription) {
          if (!subscription) {
            //subscribe();
            subscribeForTopic("test topic", "test param")
            console.log("subscribe")
            return
          }
          // Keep your server in sync with the latest subscriptionId
          param.subscription = subscription
          console.log("sendSubscriptionToServer")
          sendSubscriptionToServer(param)
        })
        .catch(function (err) {
          console.warn("Error during getSubscription()", err)
        })
    })
  }
}
const safariNotifications = () => {
  console.log("safariNotifications")
  // Ensure that the user can receive Safari Push Notifications.
  if ("safari" in window && "pushNotification" in window.safari) {
    var permissionData = window.safari.pushNotification.permission(
      "web.avetti.demopreview1"
    )
    checkRemotePermission(permissionData)
  }
}
const checkRemotePermission = (permissionData) => {
  if (permissionData.permission === "default") {
    // This is a new web service URL and its validity is unknown.
    window.safari.pushNotification.requestPermission(
      "https://demob2b2cpreview.avetti.io/preview/store/20180521148/push", // The web service URL.
      "web.avetti.demopreview1", // The Website Push ID.
      {}, // Data that you choose to send to your server to help you identify the user.
      checkRemotePermission // The callback function.
    )
  } else if (permissionData.permission === "denied") {
    // The user said no.
    console.log("Denied")
  } else if (permissionData.permission === "granted") {
    // The web service URL is a valid push provider, and the user said yes.
    // permissionData.deviceToken is now available to use.

    console.log("Granted")
    console.info("Device token", permissionData.deviceToken)
    subscriptionObject.subscription.endpoint = permissionData.deviceToken

    sendSubscriptionToServer(subscriptionObject)
  }
}
const subscribe = () => {
  if (typeof window !== undefined) {
    const publicKey = base64UrlToUint8Array(applicationServerPublicKey)
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey,
        })
        .then(function (subscription) {
          param.subscription = subscription
          return sendSubscriptionToServer(param)
        })
        .catch(function (e) {
          if (Notification.permission === "denied") {
            console.warn("Permission for Notifications was denied")
          } else {
            console.error("Unable to subscribe to push.", e)
          }
        })
    })
  }
}
const sendSubscriptionToServer = (subscription) => {
  let __browser = browserInfo()
  subscription.deviceInfo = __browser

  // Normally, you would actually send the subscription to the server:
  fetch(notificationUrl, {
    //credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(subscription),
  })
    .then(function (res) {
      res.json()
    })
    .then(function (response) {
      if (response) {
        console.log("Success:", response)
      }
    })
    .catch(function (error) {
      console.error("Error:", error)
    })
}

const subscribeForTopic = (topic, attribute) => {
  // Service Worker file needed for this
  // 1. check if user already subscribed, if not subscribe then subscribe for topic
  // 2. if subscribed then subscribe with subs ID(if user takes too long to subscribe)

  if (typeof window !== undefined) {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then(function (subscription) {
          let param = {}
          param.topic = topic
          param.attribute = attribute
          param.subscription = subscription
          if (subscription !== null) {
            sendSubscriptionToServer(param)
          } else {
            console.log("User not subscribed first.")
            subscribe(param)
          }
        })
    })
  }
}

// Unsubscribe user from topic
const unsubscribeFromTopic = (topic, attribute) => {
  if (typeof window !== undefined) {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then(function (subscription) {
          subscription
            .unsubscribe()
            .then(function (successful) {
              let param = {}
              param.topic = topic
              param.attribute = attribute
              param.subscription = subscription
              param.unsubscribe = true
              sendSubscriptionToServer(param)
            })
            .catch((e) => {
              // Unsubscription failed
              console.log("Unsubscribe error: ", e)
            })
        })
        .catch((e) => {
          // Unsubscription failed
          console.log("Unsubscribe error: ", e)
        })
    })
  }
}

function base64UrlToUint8Array(base64UrlData) {
  const padding = "=".repeat((4 - (base64UrlData.length % 4)) % 4)
  const base64 = (base64UrlData + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/")

  const rawData = atob(base64)
  const buffer = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i)
  }

  return buffer
}

let browserInfo = function () {
  if (typeof window !== undefined && typeof navigator !== undefined) {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [],
      d = "desktop",
      OSName = "unknown-os"
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    ) {
      d = "mobile"
    }
    if (navigator.appVersion.indexOf("Win") !== -1) OSName = "windows"
    if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "mac"
    if (navigator.appVersion.indexOf("X11") !== -1) OSName = "unix"
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "linux"
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return { name: "ie", version: tem[1] || "", device: d, os: OSName }
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR\/(\d+)/)
      if (tem != null) {
        return { name: "opera", version: tem[1], device: d, os: OSName }
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"]
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1])
    }
    return { name: M[0].toLowerCase(), version: M[1], device: d, os: OSName }
  }
}

/* if (typeof window !== undefined && typeof navigator !== undefined) {
  if (typeof navigator.serviceWorker === "function") {
    const wb = new Workbox("/sw.js")

    wb.addEventListener("installed", (event) => {
      console.log("Instelled event", event)
      if (event.isUpdate) {
        console.log("Instelled event IS UPDATE", event.isUpdate)
        window.location.reload()
      }
    })
    //wb.register().then(initialiseState);
    wb.register()
  }
} */

export {
  chromeNotifications,
  safariNotifications,
  browserInfo,
  unsubscribeFromTopic,
  checkRemotePermission,
}
