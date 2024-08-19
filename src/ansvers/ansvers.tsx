import React from 'react';
import {Control, Controller, useFieldArray} from 'react-hook-form';
import s from './styles.module.scss';
import {FormData} from '../useFieldArray/useFieldArray'

interface IProps {
    control: Control<FormData>;
    parentFieldIndex: number;
}
export const Answers = ({
                              control,
                              parentFieldIndex
                          }: IProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${parentFieldIndex}.options`
    });

    const addAnsver = () => {
        append({
            optionText: ""
        })
    }
    const remoutAnsver = (index: number) => {
        remove(index)
    }

    return (
          <div>
            {fields.map((field, index) => (
                    <div className={s.answers} key={field.id}>
                        <label htmlFor={`questions[${index}].options[${index}]`}>Вариант
                            ответа {index + 1}</label>
                        <div className={s.answer}>
                            <Controller
                                control={control}
                                name={`questions.${parentFieldIndex}.options.${index}.optionText`}
                                render={({field}) => (
                                    <input className={s.input} {...field} />
                                )}
                            />
                            <button className={s.button} type="button"
                                    onClick={() => remoutAnsver(index)}>Удалить
                            </button>
                        </div>
                    </div>
                         )
            )}
            <div className={s.button_container}>
                <button className={s.button} type="button" onClick={addAnsver}>
                    Добавить вариант ответа
                </button>
            </div>
            </div>
    );
}