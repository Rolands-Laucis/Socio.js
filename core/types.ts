export type id = string | number;

export type PropKey = string;
export type PropValue = object | string | number | null;
export type PropAssigner = (key: PropKey, new_val:PropValue) => boolean;

//msg kinds
export type CoreMessageKind = 'REG' | 'UNREG' | 'SQL' | 'PING' | 'AUTH' | 'GET_PERM' | 'PROP_REG' | 'PROP_UNREG' | 'PROP_GET' | 'PROP_SET' | 'SERV';
export type ClientMessageKind = 'CON' | 'UPD' | 'PONG' | 'AUTH' | 'GET_PERM' | 'RES' | 'ERR' | 'PROP_UPD';

export type QueryMarker = 'socio' | 'auth' | 'perm';