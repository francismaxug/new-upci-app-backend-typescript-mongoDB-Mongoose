const sendSMS = async (message: string, phone?: string) => {
  console.log(process.env.WITTIFLOW_API_ID)
  console.log(process.env.WITTIFLOW_SECRETE)
  try {
    const res = await fetch(
      `https://api.wittyflow.com/v1/messages/send?app_id=${process.env.WITTIFLOW_API_ID}&app_secret=${process.env.WITTIFLOW_SECRETE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          from: "max",
          to: phone,
          type: "1", // <!-- use 0 for flash sms and 1 for plain sms -->
          message
        })
      }
    )
    console.log(res)
    if (!res.ok) {
      return false
    }
    const data = await res.json()

    return data
  } catch (error) {
    throw error
  }
}

export { sendSMS }
