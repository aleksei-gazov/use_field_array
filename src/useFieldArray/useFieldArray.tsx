import React from 'react';
import {Resolver, useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './styles.module.scss';
import {Answers} from "../ansvers/ansvers";
import {Questions} from "../questions/questions";

interface Question {
  questionText: string;
  options: Option[];
}
interface Option {
    optionText: string;
}
export interface FormData {
  questions: Question[];
}
//  Создаем минимальную схему валидации с помощью YUP
const schema = yup.object().shape({
    questions: yup.array().of(
        yup.object().shape({
            questionText: yup.string().required('Введите текст вопроса'),
            options: yup.array().of(
                yup.object().shape({
                    optionText: yup.string().required('Введите текст варианта ответа')
                })
            )
        })
    )
});
export const UseFieldArray = () => {

    // Получаем необходимые методы из хука UseForm
    const { control, handleSubmit } = useForm<FormData>({
        resolver: yupResolver(schema) as Resolver<FormData>
    });

    // Получаем необходимые методы из хука UseFieldArray
    const { fields, append, remove, move  } = useFieldArray<FormData, 'questions'>({
        control,
        name: 'questions'
    });

    // Функция для сабмита формы
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    // Функция для перемещения варианта ответа вверх в массиве
    const moveUp = (index: number) => {
        if (index > 0) {
            move(index, index - 1)
        }
    };

    // Функция для перемещения варианта ответа вниз в массиве
    const moveDown = (index: number) => {
        if (index < fields.length - 1) {
            move(index, index + 1)
        }
    };

    // Функция для удаления вопроса
    const removeQuestion = (index: number) => {
        remove(index)
    }

    // Функция для добавления нового вопроса
    const addQuestion = () => {
        append({questionText: '', options: []})
    }

    return (
        <form className={s.wrapper_form} onSubmit={handleSubmit(onSubmit)}>
            {fields.map((fieldT, index) => (
                <div className={s.content_form} key={fieldT.id}>
                    <div className={s.question_container}>
                        <label htmlFor={`questions[${index}].questionText`}>Вопрос {index + 1}</label>
                        <div className={s.question}>
                            <Questions questionFieldIndex={index} control={control}/>
                            <button className={s.button} type="button" onClick={() => moveUp(index)}>Вверх</button>
                            <button className={s.button} type="button" onClick={() => moveDown(index)}>Вниз</button>
                            <button className={s.button} type="button" onClick={() => removeQuestion(index)}>Удалить
                                вопрос
                            </button>
                        </div>
                    </div>
                    <Answers
                        control={control}
                        parentFieldIndex={index}
                    />
                    </div>
            ))}
            <div className={s.button_container}>
                <button className={s.button} type="button"
                        onClick={addQuestion}>Добавить вопрос
                </button>
                <button className={s.button} type="submit">Отправить</button>
            </div>
        </form>
);
}
