import { ReactNode, SFC } from 'react'
import theme from '../common/theme'
import Flex, { IFlexProps } from '../components/_base/Flex'

const Container: SFC<IFlexProps & { children: ReactNode; as?: string }> = ({
  children,
  as,
  ...props
}) => {
  return (
    <Flex
      maxWidth={theme.mw.wide}
      width={1}
      px={[2, 3, 4]}
      m="0 auto"
      as={as}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Container