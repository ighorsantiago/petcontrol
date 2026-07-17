import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') return true;

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

function parseDateBR(date: string, hour?: string): Date {
    const [day, month, year] = date.split('/').map(Number);
    const [h, m] = hour ? hour.split(':').map(Number) : [9, 0];
    return new Date(year, month - 1, day, h, m, 0);
}

export async function scheduleNotification(
    petName: string,
    eventLabel: string,
    scheduledDate: string,
    scheduledHour?: string,
): Promise<string | null> {
    const granted = await requestNotificationPermissions();
    if (!granted) return null;

    const trigger = parseDateBR(scheduledDate, scheduledHour);
    // Só bloqueia se o horário já passou (data de hoje com hora futura é válida)
    if (trigger < new Date()) return null;

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: `🐾 ${petName}`,
            body: `Lembrete: ${eventLabel}`,
        },
        trigger,
    });

    return notificationId;
}

export async function cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
}
