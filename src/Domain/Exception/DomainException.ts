class DomainException extends Error {
  constructor(message: string = 'Ошибка') {
    super(message);
  }
}

export default DomainException;
