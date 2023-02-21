
### Redux
> Redux是一个状态容器
> Redux 发布订阅的实现方式，以store为数据中心，使用 dispatch 触发从而修改数据，使用 subscribe 订阅数据。dispatch 的时候会通知所有的 subscribe 函数
![redux 模拟实现](./redux.js)

1. `什么是状态容器`-存放公共数据的仓库
例子：假如把项目中的所有组件拉到一个钉钉群里，那Redux充当了这个群里的`群文件`这个角色

2. *在整个Redux的工作流程中，数据流向是严格单向的*

3. 为什么需要redux
前端复杂性很大程度上是由于大量的无序的操作导致的。
比如一个复杂的项目中可能存在父子、子父、兄弟、跨层级或者是反向数据流等，整个项目的数据处理会变得异常复杂且难以追踪数据的变化。
===> redux的目标是：1.让state的变得可预测；2.统一管理动作和状态

4. applymiddleware源码中有执行每个middleware然后传入middleWareAPI，其中dispatch为什么用一个匿名函数包裹因为要保证被派发到每个中间件的中的dispatch都是同一个且是最新的

### react-redux 中的 provider 和 connect 原理
- provider 提供了连接的可能性，连接的基础。内部会通过 context.provider 去挂载数据.
```jsx
<Provider store={store}>
    <Container />
</Provider>
// 等价于
<Provider store={store}>
    <Context.Provider value={{value: contextValue}}>
        <Container />
    </Context.Provider>
</Provider>
```

- connect 创建容器组件，用于获取 provider 通过 context 提供的 store， 并将 mapStateToProps 和 mapDispatchToProps 返回的 state 和 dispatch 传递给 UI 组件.
注意：connect 可以监听 store 中 state 的变化，从而在 state 发生变化的时候通知到组件，从而实现组件更新
```js
export default function connectAdvanced(selectorFactory, _ref) {
  // coding...
  return function wrapWithConnect(WrappedComponent) {
    // coding...
    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    }
    // coding...
    function ConnectFunction(props) {
      // coding...
      
      // 获取context对象
      var ContextToUse = useMemo(function () {
        return propsContext && propsContext.Consumer && isContextConsumer(React.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); 
      
      // 获取Context.Provider绑定的value值{store，subscription}
      var contextValue = useContext(ContextToUse);
      
      // 获取store
      var store = didStoreComeFromProps ? props.store : contextValue.store;
      // childPropsSelector返回一个函数（），接受store.getState()和props
      var childPropsSelector = useMemo(function () {
        return createChildSelector(store);
      }, [store]);
      
      // 这里执行childPropsSelector，将store.getState()和props传递进去，然后mapStateToProps接受到state和props，至于dispatch，在执行selectorFactory(store.dispatch, selectorFactoryOptions);就传递进去了。
      var actualChildProps = usePureOnlyMemo(function () {
        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
          return childPropsFromStoreUpdate.current;
        }
        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps]);
      
      // actualChildProps得到的就是mapStateToProps返回的state，把它放在props中传递给UI组件
      var renderedWrappedComponent = useMemo(function () {
        return React.createElement(WrappedComponent, _extends({}, actualChildProps, {
          ref: forwardedRef
        }));
      }, [forwardedRef, WrappedComponent, actualChildProps]);
      
      
      var renderedChild = useMemo(function () {
        // shouldHandleStateChanges控制是否应该订阅redux store中的state变化。
        if (shouldHandleStateChanges) {
          // 订阅redux store中的state变化，返回ContextToUse.Provider嵌套组件
          return React.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }
        // 不需要订阅redux store中的state变化就直接返回UI组件
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    }
    // React.memo用于创建一个纯函数组件，跟PureComponent一样，但React.memo作用于function component，而PureComponent作用于class component。使用纯函数组件最大的作用就是只有props变化时组件才会重新渲染，可以提高渲染性能。
    var Connect = pure ? React.memo(ConnectFunction) : ConnectFunction;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;

    if (forwardRef) {
      var forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
        return React.createElement(Connect, _extends({}, props, {
          forwardedRef: ref
        }));
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistStatics(forwarded, WrappedComponent);
    }
    // hoistStatics是hoist-non-react-statics包的导出，用于将组件中非react自带的静态方法复制到另一个组件。该包一般用于定义HOC中，因为当你给一个组件添加一个HOC时，原来的组件会被一个container的组件包裹，这意味着新的组件不会有原来组件任何静态方法。参考：https://zhuanlan.zhihu.com/p/36178509
    return hoistStatics(Connect, WrappedComponent);
  };
}
```


