import { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import clsx from 'clsx';
import styles from './App.module.scss';

export function App() {
	const [articleState, setArticleState] = useState(defaultArticleState);
	return (
		<>
			<div
				className={clsx(styles.main)}
				style={
					{
						'--font-family': articleState.fontFamilyOption.value,
						'--font-size': articleState.fontSizeOption.value,
						'--font-color': articleState.fontColor.value,
						'--container-width': articleState.contentWidth.value,
						'--bg-color': articleState.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm
					title='Задайте параметры'
					articleState={articleState}
					setArticleState={setArticleState}
				/>
				<Article />
			</div>
		</>
	);
}
