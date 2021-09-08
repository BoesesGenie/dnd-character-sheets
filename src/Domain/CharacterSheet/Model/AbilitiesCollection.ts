import DomainException from "../../Exception/DomainException";
import Abilities from "./Abilities";
import Ability from "./DTO/Ability";

class AbilitiesCollection {
  private readonly ABILITIES_COUNT = 6;

  private abilities: { [key in Abilities]: Ability | null } = {
    [Abilities.STRENGTH]: null,
    [Abilities.DEXTERITY]: null,
    [Abilities.CONSTITUTION]: null,
    [Abilities.INTELLIGENCE]: null,
    [Abilities.WISDOM]: null,
    [Abilities.CHARISMA]: null,
  };

  constructor(abilities: Ability[]) {
    if (abilities.length !== this.ABILITIES_COUNT) {
      throw new DomainException(`Число характеристик не может быть отличным от ${this.ABILITIES_COUNT}.`);
    }

    abilities.forEach((ability) => {
      this.abilities[ability.name] = ability;
    });

    if (Object.values(this.abilities).find(ability => ability === null)) {
      throw new DomainException('Должны быть заполнены все характеристики.');
    }
  }
}

export default AbilitiesCollection;
