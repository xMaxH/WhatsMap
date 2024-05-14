import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {category_menu_style, pin_style} from "../Styles/styles";

type Option = {
    label: string;
    value: string;
};

type SelectCategoryProps = {
    setCategory: (category: string) => void;
    selectedCategory?: string; // Optional prop to display current selection
};

const SelectCategory: React.FC<SelectCategoryProps> = ({ setCategory, selectedCategory }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const options: Option[] = [
        { label: 'Food', value: 'food' },
        { label: 'Fitness', value: 'fitness' },
        { label: 'Bars', value: 'bars' },
        { label: 'Fun', value: 'fun' },
        { label: 'Not Fun', value: 'not_fun' },
        { label: 'Other', value: 'other' }
    ];

    useEffect(() => {
        // Sets the initial selected value based on the selectedCategory prop
        if (selectedCategory) {
            const initialOption = options.find(option => option.label === selectedCategory);
            if (initialOption) {
                setSelectedValue(initialOption.value);
            }
        }
    }, [selectedCategory]);  // Ensures it updates if selectedCategory changes

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setModalVisible(false);
        const selectedOption = options.find(option => option.value === value);
        if (selectedOption) {
            setCategory(selectedOption.label);
        }
    };

    return (
        <View style={category_menu_style.root}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={category_menu_style.button}>
                <Text style={pin_style.button_text}>{selectedValue ? options.find(o => o.value === selectedValue)?.label : 'Select Category'}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={category_menu_style.modal_overlay}>
                        <View style={category_menu_style.modal_view}>
                            {options.map(option => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={category_menu_style.option}
                                    onPress={() => handleSelect(option.value)}
                                >
                                    <Text style={category_menu_style.choice_text}>{option.label}</Text>
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
