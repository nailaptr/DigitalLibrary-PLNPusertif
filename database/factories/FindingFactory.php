<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FindingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'finding_number' => $this->faker->unique()->numerify('FND-####'),
            'person_name' => $this->faker->name(),
            'existing_work_area' => $this->faker->company(),
            'clause' => $this->faker->numerify('#.#.#'),
            'finding_statement' => $this->faker->sentence(),
            'location_auditee' => $this->faker->city(),
            'cause' => $this->faker->sentence(),
            'objective_evidence' => $this->faker->sentence(),
            'requirement' => $this->faker->sentence(),
            'preventive_action' => $this->faker->sentence(),
            'finding_type' => $this->faker->randomElement(['major', 'minor', 'pi']),
            'evaluation_note' => $this->faker->optional()->sentence(),
            'is_published' => $this->faker->boolean(70),
        ];
    }
}
