import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

interface Option {
    value: string;
    label: string;
    icon?: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select option",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) return;

            switch (event.key) {
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setHighlightedIndex(prev => 
                        prev <= 0 ? options.length - 1 : prev - 1
                    );
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setHighlightedIndex(prev => 
                        prev >= options.length - 1 ? 0 : prev + 1
                    );
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (highlightedIndex >= 0) {
                        onChange(options[highlightedIndex].value);
                        setIsOpen(false);
                    }
                    break;
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, highlightedIndex, options, onChange]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        setHighlightedIndex(-1);
    };

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div 
            ref={selectRef}
            className={`${styles.customSelect} ${className} ${isOpen ? styles.open : ''}`}
        >
            <div 
                className={styles.selectTrigger}
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className={styles.selectedValue}>
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && (
                                <span className={styles.selectedIcon}>{selectedOption.icon}</span>
                            )}
                            <span>{selectedOption.label}</span>
                        </>
                    ) : (
                        <span className={styles.placeholder}>{placeholder}</span>
                    )}
                </div>
                <div className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path 
                            d="M5 7.5L10 12.5L15 7.5" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className={`${styles.optionsContainer} ${isOpen ? styles.optionsVisible : ''}`}>
                <div className={styles.optionsList} role="listbox">
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            className={`${styles.option} ${
                                option.value === value ? styles.selected : ''
                            } ${
                                index === highlightedIndex ? styles.highlighted : ''
                            }`}
                            onClick={() => handleOptionClick(option.value)}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.icon && (
                                <span className={styles.optionIcon}>{option.icon}</span>
                            )}
                            <span>{option.label}</span>
                            {option.value === value && (
                                <div className={styles.checkmark}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path 
                                            d="M13.5 4.5L6 12L2.5 8.5" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;