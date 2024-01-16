import { NotificationType } from "~/types/global";

export const notificationMessageMap: { [key in NotificationType]: string } = {
    like: "liked your profile",
    view: "viewed your profile",
    message: "sent you a message",
    match: "liked your profile - you are now a match!",
    unlike: "unliked your profile - you are no longer a match!",
}