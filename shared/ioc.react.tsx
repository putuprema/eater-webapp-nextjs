import {interfaces} from "inversify";
import React, {useContext} from "react";
import Container = interfaces.Container;

type Props = {
    container: Container
}

const ServicesContext = React.createContext<Props>({
    container: null!
})

export const ServiceProvider: React.FC<Props> = (props) => (
    <ServicesContext.Provider value={{container: props.container}}>
        {props.children}
    </ServicesContext.Provider>
)

export function useService<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const {container} = useContext(ServicesContext);
    return container.get<T>(identifier);
}