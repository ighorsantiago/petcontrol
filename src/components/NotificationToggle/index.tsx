import { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { InputForm } from '@/components/InputForm';
import { maskDate, maskTime } from '@/utils/masks';

type Props = {
    scheduledDate: string;
    scheduledHour: string;
    onChangeDate: (v: string) => void;
    onChangeHour: (v: string) => void;
};

export function NotificationToggle({ scheduledDate, scheduledHour, onChangeDate, onChangeHour }: Props) {
    const [enabled, setEnabled] = useState(false);

    function handleToggle(value: boolean) {
        setEnabled(value);
        if (!value) {
            onChangeDate('');
            onChangeHour('');
        }
    }

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.label}>Agendar lembrete</Text>
                <Switch
                    value={enabled}
                    onValueChange={handleToggle}
                    trackColor={{ false: '#BDBBBB', true: '#3E84A8' }}
                    thumbColor="#fff"
                />
            </View>
            {enabled && (
                <View style={styles.inputs}>
                    <InputForm
                        style={styles.input}
                        placeholder="Data do lembrete (DD/MM/AAAA)"
                        value={scheduledDate}
                        onChangeText={(v) => onChangeDate(maskDate(v))}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                    <InputForm
                        style={styles.input}
                        placeholder="Hora (HH:MM)"
                        value={scheduledHour}
                        onChangeText={(v) => onChangeHour(maskTime(v))}
                        maxLength={5}
                        keyboardType="numeric"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 8,
    },
    label: {
        fontSize: 15,
        color: '#4A4A4A',
    },
    inputs: {
        gap: 8,
    },
    input: {
        backgroundColor: '#FFF',
    },
});
