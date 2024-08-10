import classNames from 'classnames'
import './index.scss'
import { changeActiveIndex } from '../../store/modules/takeaway'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
  const {foodsList} = useSelector(state=>state.foods)
  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  const dispatch = useDispatch()
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
            onClick={()=>dispatch(changeActiveIndex(index))}
            key={item.tag}
            className={classNames(
              'list-menu-item',
              'active'
            )}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
