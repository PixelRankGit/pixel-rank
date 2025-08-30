export const Log = (target: any, propertyKeys: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = (...args: any[]) => {
        console.log(`Rota ${propertyKeys} funcionando`);
        return original.apply(this, args);
    };
};

export default Log
