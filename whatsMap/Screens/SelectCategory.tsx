import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {stylesCategory} from "../Styles/categoryStyle";

type Option = {
    label: string;
    value: string;
};

const SelectCategory = ({setCategory}) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const options: Option[] = [
        { label: 'Food', value: 'food' },
        { label: 'Fitness', value: 'fitness' },
        { label: 'Shopping', value: 'shopping' },
        { label: 'Bars', value: 'bars' },
        { label: 'Education', value: 'education' },
        { label: 'Sports', value: 'sports' }
    ];

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setModalVisible(false);

        const selectedOption = options.find(option => option.value === value);
        if (selectedOption) {
            setCategory(selectedOption.label);
        }
    };

    return (
        <View style={stylesCategory.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={stylesCategory.button}>
                <Text>{selectedValue ? options.find(o => o.value === selectedValue)?.label : 'Select Category'}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={stylesCategory.modalOverlay}>
                        <View style={stylesCategory.modalView}>
                            {options.map(option => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={stylesCategory.option}
                                    onPress={() => handleSelect(option.value)}
                                >
                                    <Text style={stylesCategory.text}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>

    );
};


export default SelectCategory;
