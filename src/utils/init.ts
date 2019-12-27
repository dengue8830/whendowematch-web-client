import { sstorage } from "./storage";
import { socketService } from "./socket.service";
import { http } from "./http";
import { Errors } from "../types/types";

export function init() {
  const token = sstorage.getToken();
  if (token) {
    socketService.setCredentials(token);
    http.setCredentials(token);
    socketService.connect();
  } else {
    throw new Error(Errors.Unauthorized);
  }
}