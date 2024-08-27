<?php

namespace App\Http\Controllers;

use App\Http\Repositories\PersonRepository;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personRepository = new PersonRepository();
        $secretFriends = $personRepository->getChosenList();
        if ($secretFriends['status'] !== 200) {
            $personRepository->clearSecretFriends();
            return response()->json($secretFriends, $secretFriends['status']);
        }

        return response()->json($secretFriends, $secretFriends['status']);
    }

    public function clear()
    {
        $personRepository = new PersonRepository();
        $clear = $personRepository->clearSecretFriends();
        if ($clear['status'] !== 200) {
            return response()->json($clear, $clear['status']);
        }
        return response()->json($clear, $clear['status']);
    }

    # função de sortear
    public function change()
    {
        $personRepository = new PersonRepository();
        $clear = $personRepository->clearSecretFriends();
        if ($clear['status'] !== 200) {
            return response()->json($clear, $clear['status']);
        }

        $choose = $personRepository->chooseRandomly();
        if ($choose['status'] !== 200) {
            $personRepository->clearSecretFriends();
            return response()->json($choose, $choose['status']);
        }

        $secretFriends = $personRepository->getChosenList();
        if ($secretFriends['status'] !== 200) {
            $personRepository->clearSecretFriends();
            return response()->json($secretFriends, $secretFriends['status']);
        }

        return response()->json($secretFriends, $secretFriends['status']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedPersonData = Validator::make(
            $request->all(),
            [
                'name'  => 'required|string|min:3',
                'email' => 'required|email|unique:people,email',
            ],
            [
                'email.unique'   => 'O email informado já está em uso',
                'email.required' => 'O email é obrigatório',
                'email.email'    => 'O email informado é inválido',
                'name.required'  => 'O nome é obrigatório',
                'name.string'    => 'O nome informado é inválido',
                'name.min'       => 'O nome informado é muito curto',
            ]
        );

        if ($validatedPersonData->fails()) {
            return response()->json($validatedPersonData->errors(), 400);
        }

        $personDataRequest = $request->only(['name', 'email']);

        $personRepository = new PersonRepository();
        $person = $personRepository->create($personDataRequest);

        return response()->json($person, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $personRepository = new PersonRepository();
        $person = $personRepository->find($id);
        if (!$person) {
            return response()->json(['message' => 'Pessoa não encontrada'], 404);
        }
        return response()->json($person, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $validatedPersonData = Validator::make(
            $request->all(),
            [
                'name'  => 'required|string|min:3',
                'email' => 'required|email',
            ],
            [
                'email.unique'   => 'O email informado já está em uso',
                'email.required' => 'O email é obrigatório',
                'email.email'    => 'O email informado é inválido',
                'name.required'  => 'O nome é obrigatório',
                'name.string'    => 'O nome informado é inválido',
                'name.min'       => 'O nome informado é muito curto',
            ]
        );

        if ($validatedPersonData->fails()) {
            return response()->json($validatedPersonData->errors(), 400);
        }

        $personDataRequest = $request->only(['name', 'email']);
        $personRepository = new PersonRepository();
        if ($personRepository->validEmailExists($personDataRequest['email'],  $id)) {
            return response()->json(['message' => 'Email já cadastrado por outro usuário'], 400);
        }
        $person = $personRepository->update($id, $personDataRequest);
        if ($person === 0) {
            return response()->json(['message' => 'Pessoa não encontrada'], 404);
        }
        $person = $personRepository->find($id);
        return response()->json($person, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $personRepository = new PersonRepository();
        $person = $personRepository->find($id);
        if ($person === null) {
            return response()->json(['message' => 'Pessoa não encontrada'], 404);
        }
        if ($personRepository->delete($id)) {
            return response()->json(['message' => 'Pessoa deletada com sucesso'], 200);
        }
        return response()->json(['message' => 'Erro ao deleta pessoa'], 500);
    }
}
