import React from 'react';
import {Control, Controller} from 'react-hook-form';
import s from './styles.module.scss';
import {FormData} from "../useFieldArray/useFieldArray";

interface IProps {
    control: Control<FormData>;
    questionFieldIndex: number;
}
export const Questions = ({
                              control,
                              questionFieldIndex
                          }: IProps) => {

    return ( <Controller
                control={control}
            // Обратите внимание для корректной работы нам необходим индекс текущего элемента
                name={`questions.${questionFieldIndex}.questionText`}
                render={({field}) => (
                <input className={s.input} {...field} />
           )}
          />
    )
}
