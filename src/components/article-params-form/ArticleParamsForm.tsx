import { useState, useRef, SyntheticEvent } from 'react';
import { useClose } from './hook/useClose';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import {
	defaultArticleState,
	fontSizeOptions,
	TArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';

// Типы
export type TArticleParamsProps = {
	title: string;
	articleState: TArticleState;
	setArticleState: any;
};

export const ArticleParamsForm = ({
	title,
	articleState,
	setArticleState,
}: TArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const formRef = useRef<HTMLFormElement | null>(null);

	const formSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	//Сброс формы
	const resetForm = () => {
		setArticleState(formState);
	};

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={formSubmit}
					onReset={resetForm}
					ref={formRef}>
					<Text as={'h1'} size={31} weight={800} uppercase>
						{title}
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setFormState({ ...formState, fontFamilyOption })
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='fontSize'
						onChange={(fontSizeOption) =>
							setFormState({ ...formState, fontSizeOption })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(fontColor) => setFormState({ ...formState, fontColor })}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(backgroundColor) =>
							setFormState({ ...formState, backgroundColor })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(contentWidth) =>
							setFormState({ ...formState, contentWidth })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => setFormState(defaultArticleState)}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
