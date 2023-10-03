export async function updateSeconds(event: WebhookEvent) {
  if (!(isEntityCreate(event) || isEntityUpdate(event))) return;


  const today = new Date();
  const timestamp = {
    year: today.getFullYear(),
    month: today.getMonth()+1,
    day: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds()
  };

  const updateReqBody = {
    'c_lastUpdateSeconds.year': `${timestamp.year}`,
    'c_lastUpdateSeconds.month': `${timestamp.month}`,
    'c_lastUpdateSeconds.day': `${timestamp.day}`,
    'c_lastUpdateSeconds.hours': `${timestamp.hours}`,
    'c_lastUpdateSeconds.minutes': `${timestamp.minutes}`,
    'c_lastUpdateSeconds.seconds': `${timestamp.seconds}`
  };

  const headers = new Headers();
  headers.set("content-type", "application/json");
  await fetch(`https://api.yext.com/v2/accounts/me/entities/${event.entityId}?v=20221010&api_key=${API_KEY}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updateReqBody)
  })
}


function isEntityCreate(event: WebhookEvent) {
  return event.meta.eventType === "ENTITY_CREATED";
}

function isEntityUpdate(event: WebhookEvent) {
  return event.meta.eventType === "ENTITY_UPDATED" &&
  event.changedFields.fieldNames !== ["c_lastUpdateSeconds"];
}