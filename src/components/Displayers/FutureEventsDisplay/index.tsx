import { useState, useCallback } from 'react';
import { FlatList, Text as RNText, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/hooks';
import {
    Container,
    Content,
    Box,
    Title,
    InfoBox,
    BoxContent,
    Label,
    Text,
} from './styles';

type FutureEvent = {
    id: string;
    type: string;
    description: string;
    scheduledDate: string;
    scheduledHour?: string;
    timestamp: number;
};

function isFutureEvent(scheduledDate: string, scheduledHour?: string): boolean {
    const [day, month, year] = scheduledDate.split('/').map(Number);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(year, month - 1, day);

    if (eventDay > today) return true;
    if (eventDay < today) return false;

    // Mesma data: verifica a hora
    if (!scheduledHour) return true;
    const [h, m] = scheduledHour.split(':').map(Number);
    const trigger = new Date(year, month - 1, day, h, m);
    return trigger > now;
}

function toTimestamp(scheduledDate: string, scheduledHour?: string): number {
    const [day, month, year] = scheduledDate.split('/').map(Number);
    const [h, m] = scheduledHour ? scheduledHour.split(':').map(Number) : [0, 0];
    return new Date(year, month - 1, day, h, m).getTime();
}

type Props = {
    petId: string;
};

export function FutureEventsDisplay({ petId }: Props) {
    const { user } = useAuth();
    const [, forceUpdate] = useState(0);

    useFocusEffect(useCallback(() => { forceUpdate((n) => n + 1); }, []));

    const pet = user?.pets?.find((p) => p.id === petId);

    if (!pet) return null;

    const events: FutureEvent[] = [];

    pet.vaccines?.forEach((v) => {
        if (v.scheduledDate && isFutureEvent(v.scheduledDate, v.scheduledHour))
            events.push({ id: v.id, type: 'Vacina', description: v.name, scheduledDate: v.scheduledDate, scheduledHour: v.scheduledHour, timestamp: toTimestamp(v.scheduledDate, v.scheduledHour) });
    });

    pet.medications?.forEach((m) => {
        if (m.scheduledDate && isFutureEvent(m.scheduledDate, m.scheduledHour))
            events.push({ id: m.id, type: 'Medicação', description: m.name, scheduledDate: m.scheduledDate, scheduledHour: m.scheduledHour, timestamp: toTimestamp(m.scheduledDate, m.scheduledHour) });
    });

    pet.deworming?.forEach((d) => {
        if (d.scheduledDate && isFutureEvent(d.scheduledDate, d.scheduledHour))
            events.push({ id: d.id, type: 'Vermífugo', description: d.name, scheduledDate: d.scheduledDate, scheduledHour: d.scheduledHour, timestamp: toTimestamp(d.scheduledDate, d.scheduledHour) });
    });

    pet.hygiene?.forEach((h) => {
        if (h.scheduledDate && isFutureEvent(h.scheduledDate, h.scheduledHour))
            events.push({ id: h.id, type: 'Higiene', description: h.category, scheduledDate: h.scheduledDate, scheduledHour: h.scheduledHour, timestamp: toTimestamp(h.scheduledDate, h.scheduledHour) });
    });

    pet.appointments?.forEach((a) => {
        if (a.scheduledDate && isFutureEvent(a.scheduledDate, a.scheduledHour))
            events.push({ id: a.id, type: 'Compromisso', description: a.name, scheduledDate: a.scheduledDate, scheduledHour: a.scheduledHour, timestamp: toTimestamp(a.scheduledDate, a.scheduledHour) });
    });

    events.sort((a, b) => a.timestamp - b.timestamp);

    if (events.length === 0) {
        return (
            <Container>
                <Content>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <RNText style={{ color: '#888', fontSize: 15 }}>Nenhum lembrete agendado</RNText>
                    </View>
                </Content>
            </Container>
        );
    }

    return (
        <Container>
            <Content>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Box>
                            <Title>{item.type}</Title>
                            <BoxContent>
                                <InfoBox>
                                    <Label>Nome: </Label>
                                    <Text>{item.description}</Text>
                                </InfoBox>
                                <InfoBox>
                                    <Label>Data: </Label>
                                    <Text>{item.scheduledDate}{item.scheduledHour ? ` às ${item.scheduledHour}` : ''}</Text>
                                </InfoBox>
                            </BoxContent>
                        </Box>
                    )}
                />
            </Content>
        </Container>
    );
}
