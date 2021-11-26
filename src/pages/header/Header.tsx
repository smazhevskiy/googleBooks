import React, {useEffect, useState} from 'react'
import s from './Header.module.css'
import searchIcon from '../../assets/icons/search.png'
import {useDispatch} from 'react-redux'
import {fetchBooks, setFilter, setOrderBy, setQValueSearch} from '../../store/book-reducer'
import {useTypedSelector} from '../../hooks/typedSelector'
import {setAppInfo} from '../../store/app-reducer'


export const categoryOptions = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
export const sortByOptions = ['relevance', 'newest']

export const Header = () => {
    let [qValue, setQValue] = useState<string>('')
    const dispatch = useDispatch()

    const {
        q,
        filter,
        orderBy,
        totalItems
    } = useTypedSelector(state => state.books)


    useEffect(() => {
        if (q) dispatch(fetchBooks())
    }, [dispatch, q, orderBy, filter])


    const sendHandler = () => {
        if (!qValue) {
            dispatch(setAppInfo('Введите данные для поиска'))
        }
        dispatch(setQValueSearch(qValue))
    }

    const onKeyPressHandlerInput = (e: any) => {
        if (e.key === 'Enter') {
            dispatch(setQValueSearch(qValue))
        }
    }

    const onChangeInputHandler = (e: any) => {
        setQValue(e.currentTarget.value)
    }

    const changeSortHandler = (e: any) => {
        dispatch(setAppInfo(`Sorting by ${e.currentTarget.value}`))
        dispatch(setOrderBy(e.currentTarget.value))
    }

    const changeCategoryHandler = (e: any) => {
        dispatch(setAppInfo(`Filtered by ${e.currentTarget.value}`))
        dispatch(setFilter(e.currentTarget.value))
    }

    return (
        <div className={s.wrapper}>
            <h1 style={{color: '#ccc'}}>Search for books</h1>

            <div className={s.searchBox}>
                <input
                    onKeyPress={onKeyPressHandlerInput}
                    value={qValue}
                    autoFocus
                    type="search"
                    onChange={onChangeInputHandler}
                />
                <img
                    onClick={sendHandler}
                    className={s.searchIcon}
                    src={searchIcon}
                    alt="search.png"
                />
            </div>

            <div className={s.optionsBox}>
                {totalItems > 0 && <h3 className={s.totalItems}>Found {totalItems} results </h3>}
                <span style={{margin: '0px 10px'}}>categories</span>
                <select onChange={changeCategoryHandler} id={'category'} name="categories">
                    {categoryOptions.map((category, index) => <option key={index} value={category}>{category}</option>)}
                </select>

                <span style={{margin: '0px 10px'}}>sorting by</span>
                <select onChange={changeSortHandler} name="sortBy">
                    {sortByOptions.map((sortBy, index) => <option key={index} value={sortBy}>{sortBy}</option>)}
                </select>
            </div>
        </div>
    )
}