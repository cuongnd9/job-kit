export const ROLE = {
  admin: 'admin',
  user: 'user',
  owner: 'owner',
};

export const GENDER = {
  male: 'male',
  female: 'female',
};

export const FAVORITE_FOOT = {
  right: 'right',
  left: 'left',
  both: 'both',
};

export const SUB_GROUND_STATUS = {
  ready: 'ready',
  reserved: 'reserved',
};

export const PAYMENT_TYPE = {
  online: 'online',
  offline: 'offline',
};

export const ORDER_STATUS = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  waiting_for_approve: 'waiting_for_approve', // wait for owner to approved
  cancelled: 'cancelled', // owner cancell order or  out of time
  finished: 'finished', // DONE

  // TODO THESE STATUS CAN'T CREATE ORDER (SAME SUB GROUND, STARTDAY, STARTTIME, ENDTIME)
  paid: 'paid', // paid order
  approved: 'approved', // owner approve and now waiting for paid
};

// export const WEEKDAY = {
//   monday: 1,
//   tuesday: 2,
//   wednesday: 3,
//   thursday: 4,
//   friday: 5,
//   saturday: 6,
//   sunday: 7
// }
